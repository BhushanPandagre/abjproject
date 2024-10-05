<Table stickyHeader>
<TableHead
  style={{ background: "#bbdefb" }}
>
  <TableRow>
    {[
      "#",
      "Item",
      "Quantity",
      "Unit",
      "Price(Rs.)",
      "Amount(Rs.)",
      "Actions",
    ].map((header) => (
      <TableCell
        key={header}
        sx={{
          background: "#bbdefb",
          fontWeight: "bold",
          position: "sticky",
          top: 0,
          zIndex: 5,
          padding: "2px", // Reduced padding
          fontSize: "13px", // Smaller font size
          textAlign: "center",
        }}
      >
        {header}
      </TableCell>
    ))}
  </TableRow>
</TableHead>
<TableBody sx={{ background: "white" }}>
  {formData.itemsList.map(
    (item, index) => (
      <TableRow
        key={index}
        sx={{ height: "15px" }}
      >
        {" "}
        {/* Further reduced row height */}
        <TableCell
          sx={{
            fontWeight: "bold",
            position: "sticky",
            top: 0,
            zIndex: 1,
            padding: "2px", // Reduced padding
            fontSize: "13px", // Smaller font size
            textAlign: "center",
          }}
        >
          <span>{index + 1}</span>
        </TableCell>
        <TableCell
          sx={{
            padding: "0px",
            width: "250px",
            fontSize: "10px",
          }}

         
        >
          <FormControl fullWidth>
            <Autocomplete
              options={items}
              getOptionLabel={(
                option
              ) => option.name}
              value={
                items.find(
                  (i) =>
                    i._id ===
                    formData.itemsList[
                      index
                    ]?.item
                ) || null
              }
              onChange={(e, value) =>
                handleItemChangeWrapper(
                  index,
                  value
                )
              }
              onInputChange={(
                e,
                value,
                reason
              ) =>
                handleItemInputChange(
                  e,
                  value,
                  reason,
                  index
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label=""
                  onKeyDown={(event) =>
                    handleKeyDown(
                      event,
                      index,
                      "autocomplete"
                    )
                  }
                  name={`item-${index}`}
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                  sx={{
                    "& .MuiInputBase-input":
                      {
                        height: "20px",
                        fontSize:
                          "13px",
                          textAlign:'center'
                        
                      },
                  }}
                />
              )}
            />
          </FormControl>
        </TableCell>
        <TableCell
        
          sx={{
            padding: "0px",
            width: "150px",
            fontSize: "10px",
          }}
        >
          <TextField
            name="quantity"
            type="number"
            value={item.quantity || ""}
            fullWidth
            onChange={(e) =>
              handleItemFieldChange(
                index,
                e
              )
            }
            inputRef={(ref) =>
              setQuantityRef(ref, index)
            }
            size="small"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            onKeyDown={(e) =>
              handleKeyDown(
                e,
                index,
                "quantity"
              )
            }
            sx={{
              "& .MuiInputBase-input": {
                height: "20px",
                textAlign: "center",
                
                
              },
            }}
          />
        </TableCell>
        <TableCell
          sx={{
            
            fontWeight: "bold",
            position: "sticky",
            marginTop: "5px",
            padding: "1px", 
            fontSize: "10px",
            textAlign: "center",
            width: "170px",
          }}
          align="center"
        >
          <TextField
            name="unit"
            value={item.unit.name || ""}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
            size="small"
            inputRef={(ref) =>
              setUnitRef(ref, index)
            }
            variant="standard"
            onKeyDown={(e) =>
              handleKeyDown(
                e,
                index,
                "unit"
              )
            }
            sx={{
              "& .MuiInputBase-input": {
                height: "20px", 
                textAlign: "center",
              },
            }}
          />
        </TableCell>
        <TableCell
          // sx={{ padding: "0px", fontSize: "10px" }} align="center"
          sx={{
            fontWeight: "bold",
            position: "sticky",
            marginTop: "5px",
            padding: "1px",
            fontSize: "10px",
            textAlign: "center",
            width: "150px",
          }}
        >
          <TextField
            name="price"
            type="number"
            value={item.price || ""}
            onChange={(e) =>
              handleItemFieldChange(
                index,
                e
              )
            }
            size="small"
            inputRef={(ref) =>
              setPriceRef(ref, index)
            }
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            onKeyDown={(e) =>
              handleKeyDown(
                e,
                index,
                "price"
              )
            }
            sx={{
              "& .MuiInputBase-input": {
                height: "20px", // Reduced height
                textAlign: "center",
              },
            }}
          />
        </TableCell>
        <TableCell
          sx={{
            padding: "0px",
            fontSize: "10px",
          }}
          align="center"
        >
          <TextField
            name="amount"
            type="number"
            value={item.amount || ""}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
            size="small"
            inputRef={(ref) =>
              setAmountRef(ref, index)
            }
            variant="standard"
            onKeyDown={(e) => {
              handleKeyDown(
                e,
                index,
                "amount"
              );
              if (e.key === "Enter") {
                handleAddItem(); // Trigger the add item function

                // Move focus to the item field in the next row if it exists
                if (
                  index + 1 <
                  formData.itemsList
                    .length
                ) {
                  const nextItemField =
                    document.querySelector(
                      `input[name='item-${
                        index + 1
                      }']`
                    );
                  if (nextItemField) {
                    nextItemField.focus();
                  }
                }
              }
            }}
            sx={{
              "& .MuiInputBase-input": {
                height: "20px",
                textAlign:"center"

              },
            }}
          />
        </TableCell>
        <TableCell
          sx={{
            padding: "0px",
            fontSize: "10px",
          }}
          align="center"
        >
          <Button
            onClick={() =>
              handleDeleteItem(index)
            }
            color="error"
          >
            <CancelIcon fontSize="small" />
          </Button>
        </TableCell>
      </TableRow>
    )
  )}
</TableBody>
</Table>